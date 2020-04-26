import ExpandButton from './expandButton';
import React from 'react';

import parse from 'html-react-parser';
import stripHtml from "string-strip-html";

export default class CollapsibleText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.cleanText = stripHtml(this.props.text);
    this.collapsedBefore = this.cleanText.substring(0, 200) + ' ...' ;

    this.parsedText = parse(this.props.text);
    this.handleClickExpand = this.handleClickExpand.bind(this);
  }

  handleClickExpand() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    if (!this.state.expanded) {
      return (
        <React.Fragment >
          {this.collapsedBefore}
          <ExpandButton aria-label={"Expandable Text"}
            key="ellipsis" onClick={this.handleClickExpand} />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment >
          {this.parsedText}
          <ExpandButton aria-label={"Expandable Text"}
            key="ellipsis" onClick={this.handleClickExpand} />
        </React.Fragment>
      )
    }
  }
}


// const renderItemsBeforeAndAfter = (text) => {
//   const handleClickExpand = (event) => {
//     // setExpanded(true);

//     // The clicked element received the focus but gets removed from the DOM.
//     // Let's keep the focus in the component after expanding.
//     const focusable = event.currentTarget.parentNode.querySelector('a[href],button,[tabindex]');
//     if (focusable) {
//       focusable.focus();
//     }

//     const parent = event.currentTarget.closest('div.collapsedText');
//     parent.
//   };


//   return [
//     collapsedBefore,
//     <ExpandButton aria-label={expandText} key="ellipsis" onClick={handleClickExpand} />,
//     text
//   ];
// }



// export default function collapsedText(props) {
//   const [expanded, setExpanded] = React.useState(false);

//   let [collapsedBefore, Button, text] = renderItemsBeforeAndAfter(this.props.text);
//   return (
//     <div className="collapsedText">
//       collapsedBefore
//       <Button />
//     </ div>
//   );
// }