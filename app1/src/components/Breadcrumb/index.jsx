import React from 'react'

const Breadcrumb = () => {
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    return (
        <div>
           APP1容器
           <br />
           <span>App1内部引入App2</span>
        </div>
    )
}

export default Breadcrumb