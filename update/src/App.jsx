import React from 'react';

import Form from './components/Form';
import GroupsTable from './components/GroupsTable';
import ScoresTable from './components/ScoresTable';

const FORMS = [{
  name: 'Groups',
  defaultValue: 'https://www.wgi.org/percussion/perc-current-entries/',
  scrapeUrl: '/api/scrapeGroups.php',
  submitUrl: '/api/submitGroups.php',
}, {
  name: 'Scores',
  defaultValue: 'https://wgi.org/percussion/perc-scores-2022/',
  scrapeUrl: '/api/scrapeScores.php',
  submitUrl: '/api/submitScores.php',
}];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };

    this.setSubmitData = this.setSubmitData.bind(this);
  }

  setSubmitData(data) {
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    const groupData = data.groups;
    const scoreData = data.scores;

    return (
      <div className="container my-3">
        <h2>Update</h2>
        <a href="/">Back</a>
        {FORMS.map(form => (
          <Form
            form={form}
            key={form.name}
            setSubmitData={this.setSubmitData}
            submitData={data}
          />
                ))}
        <GroupsTable data={groupData} />
        <ScoresTable data={scoreData} />
      </div>
    );
  }
}


export default App;
