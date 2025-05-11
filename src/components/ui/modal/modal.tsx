import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div className={styles.modal} data-testid='modal'>
        <div className={styles.header}>
          <h3
            className={`${styles.title} text text_type_main-large`}
            data-testid='header_modal'
          >
            {title}
          </h3>
          <button
            className={styles.button}
            type='button'
            data-testid='close_modal'
          >
            <CloseIcon type='primary' onClick={onClose} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
