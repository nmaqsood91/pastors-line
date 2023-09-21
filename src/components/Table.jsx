import React from "react";

function ContactTable({ allContacts, onRowClick }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Country</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(allContacts).map((contact) => (
          <tr
            key={contact?.id}
            onClick={() => onRowClick(contact.id)}
            style={{ cursor: "pointer" }}
          >
            <td>{contact.id}</td>
            <td>{contact.first_name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone_number}</td>
            <td>{contact?.country?.iso}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ContactTable;
