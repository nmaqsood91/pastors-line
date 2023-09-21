import { useEffect, useState } from "react";
import { makeUseAxios } from "axios-hooks";
import Modal from "../../components/Modal";
import axiosInstance from "../../api";
import Loader from "../../components/Loader";
import { connect } from "react-redux";
import ContactDetailsModal from "../../components/ContactDetailsModal";
import { showContactDetailModal } from "../../store/actions";

const useAxios = makeUseAxios({
  axios: axiosInstance,
});
const debounceDelay = 2000;

function AllContacts({
  isAllContactModalVisible,
  isDetailModalVisible,
  showContactDetailModal,
}) {
  const [allContacts, setAllContact] = useState({});
  const [currentContactDetails, setCurrentContactDetails] = useState({});
  const [search, setSearch] = useState(null);
  const abortController = new AbortController();
  const [isChecked, setIsChecked] = useState(false);

  const [{ data }, refetch] = useAxios({
    url: "/contacts.json",
    params: {
      companyId: 560,
      query: search,
      noGroupDuplicates: 1,
    },
  });

  useEffect(() => {
    if (data) {
      setAllContact(data?.contacts);
      setSearch(null);
    }
  }, [data]);

  const handleEnterKeyEvent = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      refetch();
    }
  };

  const fetchContactDetails = (id) => {
    setCurrentContactDetails(allContacts[id]);
    showContactDetailModal();
  };

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearch(newSearchTerm);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      refetch();
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimer);
      abortController.abort();
    };
  }, [search]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const filterData = (contacts) => {
    if (isChecked) {
      return Object.values(contacts).filter((item) => item.id % 2 === 0);
    }
    return Object.values(contacts);
  };

  return (
    <div>
      <Modal showModal={isAllContactModalVisible} title="All Contacts">
        <input
          placeholder="Search..."
          onChange={handleSearchInputChange}
          value={search}
          onKeyDown={handleEnterKeyEvent}
        />
        {Object.keys(allContacts).length ? (
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
              {filterData(allContacts).map((contact) => (
                <tr
                  key={contact?.id}
                  onClick={() => fetchContactDetails(contact.id)}
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
        ) : (
          <div className="text-center">
            <Loader />
          </div>
        )}

        <div className="modal-footer justify-content-start">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Only even
            </label>
          </div>
        </div>
      </Modal>
      <ContactDetailsModal
        isDetailModalVisible={isDetailModalVisible}
        contact={currentContactDetails}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAllContactModalVisible: state.isAllContactModalVisible,
    isDetailModalVisible: state.isDetailModalVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showContactDetailModal: () => dispatch(showContactDetailModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllContacts);
