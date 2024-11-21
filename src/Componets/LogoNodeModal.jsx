import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import "./FlowChart.css";

function LogoNodeModal({
  showModal,
  setShowModal,
  isInputStep,
  setIsInputStep,
  selectedOption,
  setSelectedOption,
  selectedInput,
  setSelectedInput,
  setTime,
  setSubject,
  handleInsertForLogo,
}) {
  const [stepCount, setStepCount] = useState(0); // Track the number of inserted nodes
  const [hasInteracted, setHasInteracted] = useState(false)


  // Handle Insert Node
  const handleInsertNode = () => {
    handleInsertForLogo(); // Call parent insert handler
    setStepCount((prev) => Math.min(prev + 1, hiddenDivs.length)); // Increment stepCount, cap at number of divs
    setHasInteracted(true); 
    setShowModal(false); // Close the modal after insertion
  };


  
  if (!showModal) return null;
  // Hidden Divs Array
  const hiddenDivs = [
    <div key="hidden-div-1" className="hidden-div">
   { isInputStep ? (
  <>
    <div className="List-para">
      Connect multiple List as source for their source
    </div>
    <div className="input-list">
      <div className="list-item-option-title">
        Select from List(s)
        <button>
          New Template <AddCircleOutlineIcon sx={{ marginLeft: "10px" }} />
        </button>
      </div>
      {/* Input field for typing */}
      <input
        type="text"
        className="option-input"
        placeholder="Search or type a name..."
        onChange={(e) =>{ setSelectedInput(e.target.value), setTime(e.target.value)}}
        value={selectedInput}
      />
      {/* Dropdown to select days or months */}
      <div className="dropdown-section">
        <label htmlFor="time-unit" className="dropdown-label">
          Select Time Unit:
        </label>
        <select
          id="time-unit"
          className="option-list"
          onChange={(e) => setSelectedInput(e.target.value)}
        >
          <option value="" disabled>
            Select Days or Months
          </option>
          <option value="1 Day">1 Day</option>
          <option value="7 Days">7 Days</option>
          <option value="1 Month">1 Month</option>
          <option value="3 Months">3 Months</option>
        </select>
      </div>
    </div>
    {selectedInput && (
      <div className="selected-input-display">
        <button
          className="modal-insert-button"
          onClick={handleInsertNode}
        >
          Insert
        </button>
      </div>
    )}
  </>
        ) : (
          <>
            <div>         
              <div className="TitleModleBlock">conditions</div>
            </div>
            <div className="option-list">
              <div
                className="option-item"
                onClick={() => {
                  setSelectedOption("Cold Email");
                  setIsInputStep(true); // Transition to the input step
                }}
              >
                <HourglassEmptyOutlinedIcon className="option-icon-logo-hidden" />
                <div>
                  <div className="optionItemHeading">Wait</div>
                  <div className="optionItemText">
                    Send an Email to the Lead
                  </div>
                </div>
              </div>
              <div
                className="option-item"
                onClick={() => {
                  setSelectedOption("Task");
                  setIsInputStep(true); // Transition to the input step
                }}
              >
                
                <FilterAltOffOutlinedIcon className="option-icon-logo-hidden" />
                <div>
                  <div className="optionItemHeading">if/Else (Rules)</div>
                  <div className="optionItemText">Schedual a manual task</div>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  ];

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

        {/* Check for isInputStep to toggle views */}
        {!hasInteracted && isInputStep ? (
          <>
            <div className="list-Tirle">Leads from List(s)</div>
            <div className="List-para">
              Connect multiple List as source for their source
            </div>
            <div className="input-list">
              <div className="list-item-option-title">
                Select from List(s)
                <button>
                  New Template <AddCircleOutlineIcon sx={{ marginLeft: "10px" }} />
                </button>
              </div>
              <select
                className="option-list"
                onChange={(e) =>{ setSelectedInput(e.target.value), setSubject(e.target.value)}}
                value={selectedInput}
              >
                <option value="" disabled>
                  Search for an Email Tempplate
                </option>
                <option value="AI Assisted follow up 2">
                  AI Assisted follow up 2
                </option>
                <option value="AI Assisted follow up 3">
                  AI Assisted Follow up 3
                </option>
                <option value="AI Assisted ">AI Assisted</option>
                <option value="AI Assisted follow up 1">
                  AI Assisted follow up 1
                </option>
                <option value="Salse Bank Demo">Salse Bank Demo</option>
              </select>
            </div>
            {selectedInput && (
              <div className="selected-input-display">
                <button
                  className="modal-insert-button"
                  onClick={handleInsertNode}
                >
                  Insert
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <div>Add Blocks </div>
              <div>Click on a block to configure and add it in sequence.</div>
              <div className="lineDevider"></div>
              <div className="TitleModleBlock">Outreach</div>
            </div>
            <div className="option-list">
              <div
                className="option-item"
                onClick={() => {
                  setSelectedOption("Cold Email");
                  setIsInputStep(true); // Transition to the input step
                }}
              >
                <EmailOutlinedIcon className="option-icon-logo" />
                <div>
                  <div className="optionItemHeading">Cold Email</div>
                  <div className="optionItemText">
                    Send an Email to the Lead
                  </div>
                </div>
              </div>
              <div
                className="option-item"
                onClick={() => {
                  setSelectedOption("Task");
                  setIsInputStep(true); // Transition to the input step
                }}
              >
                <CheckCircleOutlineOutlinedIcon className="option-icon-logo" />
                <div>
                  <div className="optionItemHeading">Task</div>
                  <div className="optionItemText">Schedual a manual task</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Hidden Divs Section */}
      <div className="hidden-divs-container">
        {hiddenDivs.slice(0, stepCount)}{" "}
        {/* Display divs up to the current step */}
      </div>
    </div>
  );
}

export default LogoNodeModal;
