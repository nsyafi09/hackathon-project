import React from "react";
// import { render } from "react-dom";
import ChatBox from "./ChatBox";
import ShowItem from "./ShowItem";
import "./tabs.css"
import { useLocation } from 'react-router-dom';


function Tabs() {

    let label = {
        font: "inherit",
        fontSize: "16px",
        fontWeight: "300",
        color: "#43484D",
        transition: ".4s",
        borderRadius: "0 0 10px 10px",

        padding: "10px 10px",
        margin: "auto",
        border: "none",
        borderBottom: "solid 2px #ccc",
        width: "50%",
        cursor: "pointer"
      };
  
  let activeLabel = {
    ...label,
    borderColor: "red"
  };
  
  // This only demonstrates state management and rendering
  // It's missing ARIA attributes and keyboard access, but I could
  // show you that if you'd like in another sandbox
  class Tabs extends React.Component {
    // This thing does 3 things
  
    // 1. manages the state
    state = {
      activeIndex: this.props.defaultIndex || 0
    };
  
    // 2. renders based on that state
    render() {
      let { activeIndex } = this.state;
  
      // this.props.children is just data™, so we can iterate our
      // children, map them to new children, even inspect their props
      let tabs = React.Children.map(this.props.children, (child, index) => {
        // which helps us decide which one is active
        let style = activeIndex === index ? activeLabel : label;
        return (
          <button
            style={style}
            // 3. provides a way to change that state
            onClick={() => this.setState({ activeIndex: index })}
          >
            {/* you can inspect and render the prop of a child*/}
            {child.props.label}
          </button>
        );
      });
      return (
        <div>
          <div>{tabs}</div>
          {/* Children is Just Data™ (it's an array) so we can
              access the the one we want based on state
              and render it here */}
          {this.props.children[this.state.activeIndex]}
        </div>
      );
    }
  }
  
  // Tab is actually inconsequential in this implementation, don't
  // actually even need to use it inside of <Tabs>, pass any ol' element
  // in with a "label" prop and you're good. But I'd keep it, it's good
  // for semantics and future features you might need
  const Tab = ({ children }) => <div>{children}</div>;
  
  // I would do this but not worth the conversation for this demo :P
  //const Tab = ({ children }) => <React.Fragment>{children}</React.Fragment>;

  var item_id = "";
  try { // catch if user reach this page without state like direct URL link
    const location = useLocation();
    item_id = location.state.item_id
    console.log("This is Item ID got from Genere page!")
    console.log(item_id.item_id)
  } catch (error){
    item_id = "ezaki-g:10225380"
    console.log("An unexpected page access! It displys default items")
    console.log(item_id)
  }
  
  return(
    <div className="tabs-container">
      {/* <h1>A Tabs Component in React</h1> */}
  
      <Tabs defaultIndex={0}>
        <Tab label="Item">
          <ShowItem item_id = {item_id}/>
        </Tab>
        <Tab label="Chat">
        <ChatBox item_id = {item_id} user_id = "3412341469" user_name = {"TUBE-ｲﾅﾑﾗ"}/>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Tabs
