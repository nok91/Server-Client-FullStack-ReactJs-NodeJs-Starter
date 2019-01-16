import React, { Component } from 'react';

class FilesDropDown extends Component {

    dropdown_is_open = false;

    componentDidUpdate(){
        if (!this.props.is_active) {
            this.dropdown_is_open = false;
        }
    }


    onClickDropDown_handler = () => {
        this.dropdown_is_open = !this.dropdown_is_open;
    }
  
    render() {
        const {  is_active } = this.props;

        return (
            <React.Fragment>
                <button className="btn file-list-item-context-menu" aria-haspopup="true" aria-expanded="false" data-type="context-menu-btn" data-tooltip="" data-tooltip-position="top" data-tooltip-text="More Options" aria-label="More Options" data-resin-target="moreoptions" tabIndex="0" onClick={this.onClickDropDown_handler} > ⋯ </button>
                {(is_active) &&
                    <div className={`fl-item-dropdown ${this.dropdown_is_open ? 'active' : ''}`}>
                        <ul className="fl-item-dropdown_list">
                            <li>First Option</li>
                            <li>Second Option</li>
                            <li>Third Option</li>
                        </ul>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default FilesDropDown;