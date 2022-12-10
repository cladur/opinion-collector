import React, { Component, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "@emotion/styled";

import Select from "react-dropdown-select";

// Should be changed to database data!
import { positives, negatives } from "./tags";
import "./Opinion.css";

class AddOpinionModal extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.showModal}>
          Add
        </Button>

        <Modal
          className="opinion"
          show={this.state.show}
          onHide={this.hideModal}
        >
          <form>
            <Modal.Header closeButton>
              <Modal.Title>Add Opinion</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              Score
              <br />
              <StarRating />
              <br />
              Description
              <br />
              <textarea maxlength="250" />
              <br />
              Positive features
              <br />
              <TagList type={positives} color={"#0F0"} />
              <br />
              Negative features
              <br />
              <TagList type={negatives} color={"#F00"} />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.hideModal}>
                Add
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

const state = {
  multi: true,
  disabled: false,
  loading: false,
  contentRenderer: false,
  dropdownRenderer: false,
  inputRenderer: false,
  itemRenderer: false,
  optionRenderer: false,
  noDataRenderer: false,
  selectValues: [],
  searchBy: "name",
  clearable: false,
  searchable: true,
  create: false,
  separator: false,
  forceOpen: false,
  handle: true,
  addPlaceholder: " click to add",
  labelField: "name",
  valueField: "id",
  keepSelectedInList: true,
  closeOnSelect: false,
  dropdownPosition: "bottom",
  direction: "ltr",
  dropdownHeight: "300px",
};

const setValues = (selectValues) => state.selectValues;

const noDataRenderer = () => {
  return (
    <p style={{ textAlign: "center" }}>
      <strong>Ooops!</strong> No data found
    </p>
  );
};

function TagList(props) {
  return (
    <div className="tagList">
      <div>
        <p></p>
        <div style={{ maxWidth: "250px" }}>
          <StyledSelect
            placeholder="Select Tags"
            addPlaceholder={state.addPlaceholder}
            color={props.color}
            disabled={state.disabled}
            loading={state.loading}
            searchBy={state.searchBy}
            separator={state.separator}
            clearable={state.clearable}
            searchable={state.searchable}
            create={state.create}
            keepOpen={state.forceOpen}
            dropdownHandle={state.handle}
            dropdownHeight={state.dropdownHeight}
            direction={state.direction}
            multi={state.multi}
            values={[]}
            labelField={state.labelField}
            valueField={state.valueField}
            options={props.type}
            dropdownGap={5}
            keepSelectedInList={state.keepSelectedInList}
            onDropdownOpen={() => undefined}
            onDropdownClose={() => undefined}
            onClearAll={() => undefined}
            onSelectAll={() => undefined}
            onChange={(values) => setValues(values)}
            noDataLabel="No matches found"
            closeOnSelect={state.closeOnSelect}
            noDataRenderer={
              state.noDataRenderer ? () => noDataRenderer() : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}

const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;

export default AddOpinionModal;
