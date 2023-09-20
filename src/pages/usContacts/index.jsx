import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import axiosInstance from "../../api";
import Loader from "../../components/Loader";
import { connect } from "react-redux";
import ContactDetailsModal from "../../components/ContactDetailsModal";
import { showContactDetailModal } from "../../store/actions";

const debounceDelay = 2000;

function UsContacts({
  isUsContactModalVisible,
  isDetailModalVisible,
  showContactDetailModal,
}) {
  const [usContacts, setUsContact] = useState({
    // this is a data of found contacts
    745450: {
      id: 745450,
      first_name: "Jason1",
      last_name: "Alexis1",
      email: null,
      phone_number: "9404480524",
      country_id: 226,
    },
    502931: {
      id: 502931,
      first_name: "jason",
      last_name: "Alexis",
      email: "",
      phone_number: "0",
      country_id: 226,
    },
  });
  const [currentContactDetails, setCurrentContactDetails] = useState({});
  const [search, setSearch] = useState("");
  const abortController = new AbortController();

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const params = {
      companyId: 560,
      countryId: 226,
      query: search,
      /*  ,

      page: 1, // Replace with your desired page number
  
      noGroupDuplicates: 1, */
    };
    await axiosInstance
      .get("/contacts.json", {
        params,
      })
      .then(function ({ data }) {
        setUsContact(data.contacts);
        setSearch(null);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const fetchContactDetails = (id) => {
    setCurrentContactDetails(usContacts[id]);
    showContactDetailModal();
  };

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearch(newSearchTerm);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchData();
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, debounceDelay);

    return () => {
      clearTimeout(debounceTimer);
      abortController.abort();
    };
  }, [search]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const filterData = (data) => {
    if (isChecked) {
      return Object.values(data).filter((item) => item.id % 2 === 0);
    } else {
      return Object.values(data);
    }
  };

  return (
    <>
      <Modal showModal={isUsContactModalVisible} title="US Contacts">
        <input
          placeholder="Search..."
          onChange={handleSearchInputChange}
          value={search}
          onKeyDown={handleEnterKeyPress}
        />
        {Object.keys(usContacts).length ? (
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
              {filterData(usContacts).map((contact) => (
                <tr
                  key={contact.id}
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isUsContactModalVisible: state.isUsContactModalVisible,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showContactDetailModal: () => dispatch(showContactDetailModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsContacts);
