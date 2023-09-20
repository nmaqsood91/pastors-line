import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { connect } from "react-redux";
import { allContacts, hideModal, usContacts } from "../../store/actions";
import "./style.css";

const MainScreen = ({ allContacts, hideModal, usContacts, children }) => {
  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      <div>
        <Link to="/all-contacts">
          <Button className="all-contacts-btn m-1" onClick={allContacts}>
            All Contacts
          </Button>
        </Link>
        <Link to="/us-contacts">
          <Button className="us-contacts-btn m-1" onClick={usContacts}>
            US Contacts
          </Button>
        </Link>

        <Button className="close-btn m-1" onClick={hideModal}>
          Close
        </Button>

        {children}
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    allContacts: () => dispatch(allContacts()),
    hideModal: () => dispatch(hideModal()),
    usContacts: () => dispatch(usContacts()),
  };
};

export default connect(null, mapDispatchToProps)(MainScreen);
