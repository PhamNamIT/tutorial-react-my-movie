import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { FaWindowClose } from 'react-icons/fa'

const Modal = (props) => {

   const [active, setActive] = useState(false)

   useEffect(() => {
      setActive(props.active)
   }, [props.active]);

   return (
      <div className={`modal ${active ? 'active' : ''}`} id={props.id} >
         {props.children}
      </div>
   )
}

export const ModalContent = (props) => {

   const contentRef = useRef(null)

   const closeModal = (props) => {
      contentRef.current.parentNode.classList.remove('active')
      if (props.onClose) props.onClose()
   }

   return (
      <div className="modal__content" ref={contentRef}>
         {props.children}
         <div className="modal__content__close" onClick={closeModal} >
            <FaWindowClose />
         </div>
      </div>
   )
}

Modal.propTypes = {
   active: PropTypes.bool,
   id: PropTypes.string
}

ModalContent.propTypes = {
   onClose: PropTypes.func
}

export default Modal
