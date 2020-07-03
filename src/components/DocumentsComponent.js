import React from 'react'
import styles from '../styles/documents.module.scss'

const DocumentsComponent = ({ documents }) => (

  <div className="column is-one-quarter">
    <div className={`${styles.docsContainer}`}>
      <div className={styles.title}>Documents</div>
      <hr />
      <div className="columns is-mobile is-vcentered">
        <div className="column is-2 is-offset-1">
          <i className="fa fa-file-o icon is-large"></i>
        </div>
        <div className="column is 6">
          <span>Lorem Ipsum Document</span>
        </div>
        <div className="column is-2 has-text-right">
          <i className="fa fa-download icon is-large"></i>
        </div>
        <div className="column is-1"></div>
      </div>
      <hr />
      <div className="columns is-mobile is-vcentered">
        <div className="column is-2 is-offset-1">
          <i className="fa fa-file-o icon is-large"></i>
        </div>
        <div className="column is 6">
          <span>Lorem Ipsum Document</span>
        </div>
        <div className="column is-2 has-text-right">
          <i className="fa fa-download icon is-large"></i>
        </div>
        <div className="column is-1"></div>
      </div>
      <hr />
      <div className="columns is-mobile is-vcentered">
        <div className="column is-2 is-offset-1">
          <i className="fa fa-file-o icon is-large"></i>
        </div>
        <div className="column is 6">
          <span>Lorem Ipsum Document</span>
        </div>
        <div className="column is-2 has-text-right">
          <i className="fa fa-download icon is-large"></i>
        </div>
        <div className="column is-1"></div>
      </div>
      <hr />
    </div>
  </div>
)

export default DocumentsComponent;
