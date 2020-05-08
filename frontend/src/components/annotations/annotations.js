import React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAnnotation, fetchAllAnnotations,
  fetchBookAnnotations } from '../../actions/annotation_actions';
import AnnotationCard from './annotation_card';

const tempAnnotationHighlight = {
  kind: 'highlight',
  end: 1317,
  bookline: "What Money Can't Buy: The Moral Limits of Markets (Michael Sandel)",
  language: 'en',
  author: 'Michael Sandel',
  text: 'The objection most relevant to market reasoning asks why we should ' +
    'maximize the satisfaction of preferences regardless of their moral worth. ' +
    'If some people like opera and others like dogfights or mud wrestling, must ' +
    'we really be nonjudgmental and give these preferences equal weight in the ' +
    'utilitarian calculus?72 When market reasoning is concerned with material ' +
    'goods, such as cars, toasters, and flat-screen televisions, this objection ' +
    'doesn’t loom large; it’s reasonable to assume that the value of the goods ' +
    'is simply a matter of consumer preference. But when market reasoning is ' +
    'applied to sex, procreation, child rearing, education, health, criminal ' +
    'punishment, immigration policy, and environmental protection, it’s less ' +
    'plausible to assume that everyone’s preferences are equally worthwhile. In ' +
    'morally charged arenas such as these, some ways of valuing goods may be ' +
    'higher, more appropriate than others. And if that’s the case, it’s unclear ' +
    'why we should satisfy preferences indiscriminately, without inquiring into ' +
    'their moral worth. (Should your desire to teach a child to read really ' +
    'count equally with your neighbor’s desire to shoot a walrus at point-blank ' +
    'range?)',
  statusline: 'Your Highlight on page 86 | Location 1308-1317 | ' +
    'Added on Saturday, February 22, 2020 12:29:52 AM',
  title: "What Money Can't Buy: The Moral Limits of Markets",
  begin: 1308,
  time: '2020-02-22 12:29:52',
  ordernr: 9092,
  page: 86
}
const tempAnnotationNote = {
  kind: 'note',
  end: 1317,
  bookline: "What Money Can't Buy: The Moral Limits of Markets (Michael Sandel)",
  language: 'en',
  author: 'Michael Sandel',
  text: 'Not all preferences are equal',
  statusline: 'Your Note on page 86 | Location 1317 | Added ' +
    'on Saturday, February 22, 2020 12:30:11 AM',
  title: "What Money Can't Buy: The Moral Limits of Markets",
  begin: 1317,
  time: '2020-02-22 12:30:11',
  ordernr: 9093,
  page: 86
}

const mapStateToProps = (state) => {
  return {
    annotation: state.annotations.annotations,
    allAnnotations: state.annotations.allAnnotations,
    bookAnnotations: state.annotations.bookAnnotations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookAnnotations: () => dispatch(fetchBookAnnotations()),
  }
}

class Annotations extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {bookID} = this.props.match.params;
    this.props.fetchBookAnnotations(bookID);
  }

  render() {
    return (
      <AnnotationCard annotation={tempAnnotation}/>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(Annotations));
