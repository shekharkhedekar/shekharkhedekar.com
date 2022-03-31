/* eslint-disable no-alert, react/forbid-prop-types */

import Axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

// Debug
// import groupsFixture from '../../../fixtures/scrapeGroups.json';
// import scoresFixture from '../../../fixtures/scrapeScores.json';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.form.defaultValue,
      scraping: false,
      submitting: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onGet = this.onGet.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }

  onGet(e) {
    e.preventDefault();

    const { name, scrapeUrl } = this.props.form;
    const { setSubmitData } = this.props;

    Axios.get(
      scrapeUrl,
      { params: { url: this.state.value } },
    ).then(({ data }) => {
      this.setState({ scraping: false });
      setSubmitData({
        [name.toLowerCase()]: data,
      });
    }).catch((response) => {
      alert(response);
    });

    this.setState({ scraping: true });
    setSubmitData({});

    // Debug
    // setSubmitData({
    //   [name.toLowerCase()]: name === 'Scores' ? scoresFixture : groupsFixture,
    // });
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      form,
      submitData,
      setSubmitData,
    } = this.props;
    const { name, submitUrl } = form;

    Axios.post(
      submitUrl,
      { ...submitData[name.toLowerCase()] },
    ).then(({ data }) => {
      this.setState({ submitting: false });
      setSubmitData({});
      alert(data.success);
    }).catch((response) => {
      alert(response);
    });

    this.setState({ submitting: true });
    setSubmitData({});
  }

  render() {
    const {
      form,
      submitData,
    } = this.props;
    const { name } = form;
    const {
      value,
      scraping,
      submitting,
    } = this.state;
    const submitDisabled = (
      submitting ||
      !submitData[name.toLowerCase()]
    );

    return (
      <div className="card mb-3 p-3 rounded">
        <form onSubmit={this.onGet} className="card-block">
          <h4 className="card-title">{form.name}</h4>
          <div className="form-group row">
            <div className="col-sm-6">
              <input
                className="form-control"
                type="text"
                value={value}
                onChange={this.onChange}
              />
            </div>
            <div className="col-sm-3">
              <button
                className="btn btn-secondary btn-block"
                type="submit"
                disabled={scraping}
              >
                Get {form.name}
              </button>
            </div>
            <div className="col-sm-3">
              <button
                className="btn btn-success btn-block"
                disabled={submitDisabled}
                type="button"
                onClick={this.onSubmit}
              >
                 Submit {name}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    scrapeUrl: PropTypes.string.isRequired,
    submitUrl: PropTypes.string.isRequired,
  }).isRequired,
  submitData: PropTypes.object.isRequired,
  setSubmitData: PropTypes.func.isRequired,
};

export default Form;
