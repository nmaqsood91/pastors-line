import { connect } from "react-redux";
import { closeContactDetailModal } from "../store/actions";
import Modal from "./Modal";

const ContactDetailsModal = ({
  contact,
  isDetailModalVisible,
  closeContactDetailModal,
}) => {
  return (
    <Modal
      showModal={isDetailModalVisible}
      title="Contact Details"
      maxWidth="50%"
    >
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
          <tr>
            <td>{contact.id}</td>
            <td>{contact.first_name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone_number}</td>
            <td>{contact?.country?.iso}</td>
          </tr>
        </tbody>
      </table>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeContactDetailModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeContactDetailModal: () => dispatch(closeContactDetailModal()),
  };
};

const mapStateToProps = (state) => {
  return {
    isDetailModalVisible: state.isDetailModalVisible,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetailsModal);
