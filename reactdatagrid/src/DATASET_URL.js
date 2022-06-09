function DATASET_URL(){
    const rs = [];
    const numOfRows = 100;
    const firstnames = ['Mikaela','Abigale','Ade','Hubey','Ev','Yvette','Alexine','Kath','Cherilynn','Aida','Stevie','Barby','Esra','Erastus','Mylo','Pyotr'];
    const surnames = ['Divver','Reisk','Whotton','Abby','Lindberg','Dows','Chapelhow','Halbeard','Blazic','Lovelock','Reignould','Gummer','Trobey','Fairweather','Barensky'];
    for(let i = 0 ; i < numOfRows; i++){
        const fname = firstnames[Math.floor(Math.random()*firstnames.length)];
        const sname = surnames[Math.floor(Math.random()*surnames.length)];
        rs.push({
            'id':i,
            'firstName': fname,
            'lastName': sname,
            'email':fname+"."+sname+'@yourdomain.com'
        });
    }
    return rs;
}
export default DATASET_URL;