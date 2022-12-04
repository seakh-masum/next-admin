import { differenceOfDate, makeDateString, sortData } from "./Service";
import { query, collection, getDoc, doc, where, orderBy } from "firebase/firestore";
import { db } from "./Firebase";
import { FIRESTORE_PATH } from "./ContstantData";
import { showError } from "./utility";

const fsQuery = (path) => query(collection(db, path));
const fsQueryWithOrderBy = (apiQuery) => query(collection(db, apiQuery.path), orderBy(apiQuery.sort, apiQuery.direction));
const slugQuery = (slug) => query(collection(db, FIRESTORE_PATH.tableColumns), where('name', '==', slug));


const get = (res, apiQuery) => {
  const page = parseInt(apiQuery.page);
  const limit = parseInt(apiQuery.limit);
  const { sort, direction } = apiQuery;

  let response;
  let data = res.docs.map((doc) => mapData(doc, apiQuery));
  response = { message: 'Success', count: data.length, data: data };

  if (apiQuery.path == FIRESTORE_PATH.bills) {
    response = { ...response, data: getBillApi(data) };
  }

  if (page || limit) {
    data = data.slice((page - 1) * limit, page * limit);
    response = { ...response, page: page, limit: limit, data: data };
  }

  if (sort) {
    // data = sortData(data, sort, direction);
    response = { ...response, sort: sort, data: data };
  }



  return response;
}

const mapData = (doc, apiQuery) => {
  const data = doc.data();
  let response = {
    id: doc.id,
    ...data,
    createdAt: makeDateString(data.createdAt),
    updatedAt: makeDateString(data.updatedAt),
  }

  if (apiQuery?.path == 'experience') {
    response = { ...response, tenure: differenceOfDate(data?.joiningDate, data?.lastDate) }
  }

  return response;
};

const getSingleData = async (id, path) => {
  const docRef = doc(db, path, id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
    }
  } catch (error) {
    console.log(error)
  }
}


const getAPI = (url) => {
  return fetch(url).then((res) => res.json())
}

const putAPI = (url, body) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

const postAPI = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json()).catch(err => showError(err.message))
}

const deleteAPI = (url) => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

const getBillApi = (data) => {
  if (data && data.length > 0) {
    data.forEach(item => {
      if (item.paidDate != '') {
        item.billStatus = 'paid';
      } else if (new Date() > new Date(item.dueDate)) {
        item.billStatus = 'overdue';
      } else {
        item.billStatus = 'due';
      }
    });
  }
  return data;
};

export { get, fsQuery, getSingleData, slugQuery, fsQueryWithOrderBy, getAPI, putAPI, postAPI, deleteAPI };