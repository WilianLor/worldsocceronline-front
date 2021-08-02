const getFormatedDate = (date: string) => {
  const dateObject = new Date(date);

  let dia = dateObject.getDate().toString();
  let diaF = dia.length === 1 ? "0" + dia : dia;
  let mes = (dateObject.getMonth() + 1).toString();
  let mesF = mes.length === 1 ? "0" + mes : mes;
  let anoF = dateObject.getFullYear();

  return diaF + " / " + mesF + " / " + anoF;
};

export default getFormatedDate;
