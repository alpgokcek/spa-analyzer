import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { ACTIVE } from 'AppConstants';
import './popover-modal.scss';

export default function PopoverModal(props) {
    const {content, toggleModal, handleToggleModal, handleAction, interceptorState} = props
    const handleActionClick= e => {
        interceptorState && interceptorState(true)
        handleAction && handleAction()
    }
    return (
        <Modal className="popover-modal" isOpen={toggleModal} toggle={handleToggleModal}>
            <ModalHeader toggle={handleToggleModal}>{content.title}</ModalHeader>
            <ModalBody>
                {content.body}
                {
                    content.showStatusUpdate &&
                    <div className="popover-modal-status-change">
                        <b>Önemli: </b>{content.statusUpdateText === ACTIVE ? 
                        content.statusUpdateTexts.toActive : content.statusUpdateTexts.toPassive
                        }
                    </div>
                }
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleActionClick}>{content.actionButton}</Button>{' '}
                <Button color="secondary" onClick={handleToggleModal}>{content.cancelButton}</Button>
            </ModalFooter>
        </Modal>
    )
}
