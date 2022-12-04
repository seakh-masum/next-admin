import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditCards from "./[action]";


const dbPath = FIRESTORE_PATH.cards;

const initialFormData = {
  cardName: "",
  cardNo: "",
  cardType: "credit",
  color: "#000000",
  holderName: "",
  expiryDate: '',
  cvv: "",
  network: "rupay",
  provider: "",
};

const selectedColumn = ['cardName', 'cardNo', 'cardType', 'network'];

const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditCards data={data} closeModal={closeModal} setRefresh={setRefresh} initialObject={initialObject} path={dbPath} initialFormValue={initialFormData} />
  )
}

export default ListPage(AddComponent, 'Card Details', dbPath, initialFormData, 'cards', selectedColumn);