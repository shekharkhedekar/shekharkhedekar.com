/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';

function ScoresTable({ data }) {
  return data ? (
    <div>
      <p><strong>Count:</strong> {data.scores.length}</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Unit</th>
            <th>Score</th>
            <th>Class</th>
            <th>Date</th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {data.scores.map(score => (
            <tr key={`${score.school}-${score.class}-${score.showDate}-${score.score}-${score.showUrl}`}>
              <td>{score.school}</td>
              <td>{score.score}</td>
              <td>{score.class}</td>
              <td>{score.showDate}</td>
              <td>{score.showUrl ? (
                <a
                  href={score.showUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {score.showName}
                </a>
                            ) : score.showName}
              </td>
            </tr>
                    ))}
        </tbody>
      </table>
    </div>
  ) : null;
}

ScoresTable.propTypes = {
  data: PropTypes.object,
};

ScoresTable.defaultProps = {
  data: null,
};

export default ScoresTable;
