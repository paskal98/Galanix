import React from 'react';

const TableValuesHref =({hrefLink}) => {

    let id=10000;


    const hrefs = hrefLink.map((item)=>{
        return <a key={id++} href={item}>{item}</a>
    })
  
    return (
        <div className="table__row__item table__values__item">
            {hrefs}
        </div>
    
    );

  

}

export default TableValuesHref;