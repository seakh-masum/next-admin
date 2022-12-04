import React, { useState, useEffect, Fragment } from "react";
import ErrorMessage from "components/ErrorMessage";
import Input from "components/Input";
import { assignValueInObject, defaultAddPayload, defaultUpdatePayload, getErrorMessage } from "shared/helper/Service";
import Select from "components/Select";
import ColorInput from "components/ColorInput";
import FormContainer from "components/FormContainer";
import { useRouter } from "next/router";
import { showError, showSuccess } from "shared/helper/utility";
import { postAPI, putAPI } from "shared/helper/API";
import View from "components/View";

export const ActionPage = (path, initialFormValue, inputs,) => {
  const Wrapper = ({ data, initialObject, setRefresh }) => {
    const [formValue, setFormValue] = useState(initialFormValue);
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState(initialObject);
    const [base64String, setBase64String] = useState('');
    const router = useRouter();

    const { id, action } = router.query;
    const viewData = [...inputs,
    {
      id: 8,
      name: 'isActive',
      type: 'status',
      label: 'Status',
    },
    {
      id: 9,
      name: 'createdAt',
      type: 'date',
      label: 'Created At',
    },
    {
      id: 10,
      name: 'updatedAt',
      type: 'date',
      label: 'Updated At',
    },]



    useEffect(() => {
      Object.keys(formValue).forEach((key) => {
        checkError(key);
      });
    }, [formValue]);

    useEffect(() => {
      if ('id' in router.query) {
        setFormValue(data);
      } else {
        setFormValue(initialFormValue);
      }
    }, [id]);

    const checkError = (targetName) => {
      const inputProps = inputs.find(x => x.name === targetName);
      setErrorMessage((prevErrorValue) => {
        return {
          ...prevErrorValue,
          [targetName]: getErrorMessage(
            targetName,
            formValue[targetName],
            inputProps
          ),
        };
      });
    };

    const handleChange = (event) => {

      event.preventDefault();
      const { name, value, files } = event.target;
      // const inputProps = inputs.find(x => x.name === name);
      // console.log(inputProps, value);
      // var base64String1;
      // if (inputProps.type == 'file') {
      //   // var file = document.querySelector(
      //   //   'input[type=file]')['files'][0];

      //   // var reader = new FileReader();
      //   // console.log("next");

      //   // reader.onload = function () {
      //   //   base64String1 = reader.result.replace("data:", "")
      //   //     .replace(/^.+,/, "");

      //   //   setBase64String(base64String1);

      //   //   // imageBase64Stringsep = base64String;

      //   //   // alert(imageBase64Stringsep);
      //   //   console.log(base64String1);
      //   // }
      //   // reader.readAsDataURL(file);

      //   // let base64String1 = '';
      //   getBase64(files[0], (result) => {
      //     // base64String1 = result;
      //     // console.log(base64String1)
      //     setBase64String(result);
      //     // setFormValue(state => ({ ...state, [name]: base64String1 }));
      //   });
      // } else {
      // }
      setFormValue((prevState) => ({ ...prevState, [name]: value }));
    };

    const getBase64 = (file, cb) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    };

    const saveAddData = (event) => {
      event.preventDefault();
      const isValid = JSON.stringify(errorMessage) === JSON.stringify(initialObject)
      if (isValid) {
        addApiCall();
      } else {
        showError('Form is not valid')
      }

    };

    const updateData = (e) => {
      e.preventDefault();
      const undefinedObj = assignValueInObject(initialFormValue, undefined)
      const isValid = JSON.stringify(errorMessage) === JSON.stringify(undefinedObj);
      if (isValid) {
        updateApiCall();
      } else {
        showError('Form is not valid')
      }
    }

    const addApiCall = () => {
      setLoader(true);
      setRefresh(false);
      postAPI(`/api/${path}`, defaultAddPayload(formValue))
        .then((data) => {
          afterApiCallSuccess(data.message);
        })
        .catch((error) => {
          showError(error.message);
          setLoader(false);
        });
    }

    const updateApiCall = () => {
      setLoader(true);
      setRefresh(false);
      putAPI(`/api/${path}/${id}`, defaultUpdatePayload(data, formValue))
        .then((data) => {
          afterApiCallSuccess(data.message);
        })
        .catch((error) => {
          setLoader(false);
          showError(error.message);
        });
    }


    const afterApiCallSuccess = (message) => {
      setLoader(false);
      setRefresh(true);
      showSuccess(message);
      closeModal();
    }

    const closeModal = () => {
      router.back();
    };

    return (
      <FormContainer saveData={saveAddData} updateData={updateData} isEdit={action == 'edit'} isView={action == 'view'} closeModal={() => closeModal()} loader={loader}>
        <>
          {action == 'view' ?
            (<>
              {viewData.map((input, index) => (
                <View key={index} input={input} formValue={formValue} data={data} />
              ))}
            </>
            ) : (<>
              {inputs.map((input) => (
                <Fragment key={input.id}>
                  {input.inputType == 'select' ?
                    <Select name={input.name} label={input.label} value={formValue[input.name]} onChange={handleChange} options={input?.options} /> : input.inputType === 'color' ?
                      <ColorInput
                        name="color"
                        label="Color"
                        value={formValue.color}
                        onChange={handleChange}
                      />
                      :
                      <Input
                        value={formValue[input.name]}
                        onChange={handleChange}
                        {...input}
                      >
                        {errorMessage[input.name]?.length > 0 && (
                          <ErrorMessage message={errorMessage[input.name]} />
                        )}
                      </Input>
                  }
                </Fragment>
              ))}
            </>)}
        </>
      </FormContainer>
    );
  };

  return Wrapper;
};