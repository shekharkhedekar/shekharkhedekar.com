/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';

function GroupsTable({ data }) {
  return data ? (
    <div>
      <p><strong>Year:</strong> {data.year}</p>
      <p><strong>Count:</strong> {data.groups.length}</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {data.groups.map(group => (
            <tr key={`${group.name}-${group.class}`}>
              <td>{group.url ? (
                <a
                  href={group.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {group.name}
                </a>
                            ) : group.name}
              </td>
              <td>{group.location}</td>
              <td>{group.class}</td>
            </tr>
                    ))}
        </tbody>
      </table>
    </div>
  ) : null;
}

GroupsTable.propTypes = {
  data: PropTypes.object,
};

GroupsTable.defaultProps = {
  data: null,
};

export default GroupsTable;
