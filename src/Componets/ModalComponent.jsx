import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import "./FlowChart.css";

function ModalComponent({
  showModal,
  setShowModal,
  isInputStep,
  setIsInputStep,
  selectedOption,
  setSelectedOption,
  selectedInput,
  setSelectedInput,
  handleInsert,
}) {
  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <CloseIcon
          className="modal-close"
          onClick={() => {
            setShowModal(false);
            setIsInputStep(false);
            setSelectedOption("");
            setSelectedInput("");
          }}
        />
        <div className="lineDevider"></div>
        {isInputStep ? (
          <>
            <div className="list-Tirle">Leads from List(s)</div>
            <div className="List-para">
              Connect multiple List as source for their source
            </div>
            <div className="input-list">
              <div className="list-item-option-title">
                Select from List(s)
                <button>
                  New List <AddCircleOutlineIcon sx={{ marginLeft: "10px" }} />
                </button>
              </div>
              <select
                className="option-list"
                onChange={(e) => setSelectedInput(e.target.value)}
                value={selectedInput}
              >
                <option value="" disabled>
                  Search for List
                </option>
                <option value="Test List">Test List</option>
                <option value="Test List sample">Test List sample</option>
                <option value="demo List">demo List</option>
                <option value="Existing List">Existing List</option>
                <option value="Other Lists">Other Lists</option>
              </select>
            </div>
            {selectedInput && (
              <div className="selected-input-display">
                <button className="modal-insert-button" onClick={handleInsert}>
                  Insert
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <div>Add a Source Block</div>
              <div>Pick a block and configure.</div>
              <div className="lineDevider"></div>
              <div className="TitleModleBlock">Source</div>
            </div>
            <div className="option-list">
              <div
                className="option-item"
                onClick={() => {
                  setSelectedOption("Leads from List");
                  setIsInputStep(true);
                }}
              >
                <PersonAddIcon className="option-icon" />
                <div>
                  <div className="optionItemHeading">Leads from List(s)</div>
                  <div className="optionItemText">
                    Select multiple lists as a source for this sequence
                  </div>
                </div>
              </div>
              <div className="option-item" onClick={() => setSelectedOption("Manual Add")}>
                <HowToRegIcon className="option-icon" />
                <div>
                  <div className="optionItemHeading">Manually Added</div>
                  <div className="optionItemText">
                    Manually add leads from your CRM
                  </div>
                </div>
              </div>
              <div className="option-item" onClick={() => setSelectedOption("Manually Added")}>
                <SocialDistanceIcon className="option-icon" />
                <div>
                  <div className="optionItemHeading">Social Channels</div>
                  <div className="optionItemText">
                    Add leads from selected social media channels
                  </div>
                </div>
              </div>
              <div className="option-item" onClick={() => setSelectedOption("Zapier Added")}>
                <FlashOnIcon className="option-icon" />
                <div>
                  <div className="optionItemHeading">Zapier Trigger</div>
                  <div className="optionItemText">
                    Automatically fetch leads through a Zapier trigger
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalComponent;
