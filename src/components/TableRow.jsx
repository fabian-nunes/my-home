import React, { Component } from "react";

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            value: 0,
            time: new Date().toLocaleTimeString(),
        }
    }

    
}

export default TableRow;