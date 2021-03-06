import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAnnotation, fetchAllAnnotations,
  fetchBookAnnotations } from '../../actions/annotation_actions';
import AnnotationCard from './annotation_card';
import MainGrid from '../main_grid';
import BookContainer from '../books/book_container';
import AnnotationEditCard from './annotation_edit_card';
import AnnotationCardContainer from './annotation_container';

const mapStateToProps = (state) => {
  return {
    // allAnnotations: state.annotations.allAnnotations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchBookAnnotations: (bookID) => dispatch(fetchBookAnnotations(bookID)),
  }
}

const tempAnnotation = {
  book_id: 49,
  bookline: "What Money Can't Buy: The Moral Limits of Markets (Michael Sandel)",
  title: "What Money Can't Buy: The Moral Limits of Markets",
  author: 'Michael Sandel',
  language: 'en',
  begin: 1308,
  end: 1317,
  time: new Date(...'2020-02-22-12-30-11'.split('-')),
  highlight: 'The objection most relevant to market reasoning asks why we should ' +
    'maximize the satisfaction of preferences regardless of their moral ' +
    'worth. If some people like opera and others like dogfights or mud ' +
    'wrestling, must we really be nonjudgmental and give these preferences ' +
    'equal weight in the utilitarian calculus?72 When market reasoning is ' +
    'concerned with material goods, such as cars, toasters, and flat-screen ' +
    'televisions, this objection doesn’t loom large; it’s reasonable to ' +
    'assume that the value of the goods is simply a matter of consumer ' +
    'preference. But when market reasoning is applied to sex, procreation, ' +
    'child rearing, education, health, criminal punishment, immigration ' +
    'policy, and environmental protection, it’s less plausible to assume ' +
    'that everyone’s preferences are equally worthwhile. In morally charged ' +
    'arenas such as these, some ways of valuing goods may be higher, more ' +
    'appropriate than others. And if that’s the case, it’s unclear why we ' +
    'should satisfy preferences indiscriminately, without inquiring into ' +
    'their moral worth. (Should your desire to teach a child to read really ' +
    'count equally with your neighbor’s desire to shoot a walrus at ' +
    'point-blank range?)',
  note: 'Not all preferences are equal',
  page: '86'
}

class AnnotationTest extends React.Component {
  constructor(props) {
    super(props);
    // const {bookID} = this.props.match.params;
    // this.state = {
    //   bookID
    // }
  }

  componentDidMount() { 
    // this.props.fetchBookAnnotations(this.state.bookID);
  }

  render() {
    return (
      <MainGrid>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            {/* <BookContainer bookID={this.state.bookID}/> */}
          </Grid>
          <AnnotationCardContainer annotation={tempAnnotation} />
        </Grid>
      </MainGrid>
  )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(AnnotationTest));
