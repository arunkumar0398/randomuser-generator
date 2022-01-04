export const dateFormat = (date) => {
    let initSplitDate = date.split("-");
    let resultDate = "";
    // console.log(initSplitDate);
  
    initSplitDate[2] = initSplitDate[2].slice(0, 2);
  
    for (let i = initSplitDate.length - 1; i >= 0; i--) {
      if (i === initSplitDate.length - 1) {
        resultDate = resultDate.concat("", initSplitDate[i]);
      } else {
        resultDate = resultDate.concat("/", initSplitDate[i]);
      }
    }
  
    return resultDate;
  };
  
  export const formatPhone = (phone) => {
    const initSplitPhone = phone.split("-");
    let resultPhone = "";
  
    for (let i = 0; i < initSplitPhone.length; i++) {
      resultPhone = resultPhone.concat("", initSplitPhone[i]);
    }
  
    return resultPhone;
  };
  