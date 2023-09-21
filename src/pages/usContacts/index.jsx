import React, { useEffect, useState, useRef } from "react";
import Modal from "../../components/Modal";
import axiosInstance from "../../api";
import Loader from "../../components/Loader";
import ContactTable from "../../components/Table";
import { connect } from "react-redux";
import ContactDetailsModal from "../../components/ContactDetailsModal";
import { showContactDetailModal } from "../../store/actions";

const debounceDelay = 2000;

function UsContacts({
  isAllContactModalVisible,
  isDetailModalVisible,
  showContactDetailModal,
}) {
  const [allContacts, setAllUsContacts] = useState([]);
  const [currentContactDetails, setCurrentContactDetails] = useState({});
  const [search, setSearch] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const tableContainerRef = useRef(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/contacts.json", {
        params: {
          companyId: 560,
          query: search,
          noGroupDuplicates: 1,
          page,
        },
      });

      // Handle the response data here
      if (response.data) {
        const contactsArray = Object.values(response.data.contacts);
        if (contactsArray.length > 0)
          setAllUsContacts((prevContacts) => [
            ...prevContacts,
            ...contactsArray,
          ]);
        else setAllUsContacts([]);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, page]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const filterData = (contacts) => {
    if (isChecked) {
      return contacts.filter((item) => item.id % 2 === 0);
    }
    return contacts;
  };

  const handleScroll = () => {
    if (
      tableContainerRef.current &&
      tableContainerRef.current.scrollTop +
        tableContainerRef.current.clientHeight >=
        tableContainerRef.current.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableContainerRef.current) {
        tableContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
  };

  const fetchContactDetails = (id) => {
    const contact = allContacts.find((item) => item.id === id);
    if (contact) {
      setCurrentContactDetails(contact);
      showContactDetailModal();
    }
  };

  return (
    <div>
      <Modal showModal={isAllContactModalVisible} title="US Contacts">
        <input
          placeholder="Search..."
          onChange={handleSearchInputChange}
          value={search}
        />
        <div
          ref={tableContainerRef}
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {allContacts.length ? (
            <ContactTable
              allContacts={filterData(allContacts)}
              onRowClick={fetchContactDetails}
            />
          ) : (
            <div className="text-center">No Records Found</div>
          )}
          {isLoading && <Loader />}
        </div>
        <div className="modal-footer justify-content-start">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
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

export default connect(mapStateToProps, mapDispatchToProps)(UsContacts);
