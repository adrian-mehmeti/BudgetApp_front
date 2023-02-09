import { Modal, Button } from 'react-bootstrap';
function ModalDeleted({ showModal, hidenModal, confirmModal, id }) {
  return (
    <Modal
      show={showModal}
      onHide={hidenModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete?</Modal.Body>
      <Modal.Footer>
        <Button onClick={hidenModal}>Cancel</Button>
        <Button variant="danger" onClick={() => confirmModal(id)}>
          DELETE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleted;
