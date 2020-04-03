import React from "react"
export default class PageHome extends React.Component {
    test(){
        throw Error('test')
    }
    render() {
        return <div>
            <h1>home component</h1>

            <button onClick={()=>this.test()}>test 2</button>
        </div>;
    }
}
