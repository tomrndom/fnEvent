import React from 'react'
import { connect } from 'react-redux'
import { StaticQuery, graphql } from "gatsby"

import footerContent from '../content/footer.json';

import styles from '../styles/footer.module.scss';

const Footer = ({ summit }) => (

  <StaticQuery
    query={graphql`
        query FooterQuery {
          summit {
            logo
          }
        }
      `}
    render={data => (
      <footer className="footer">
        <div className="columns">
          <div className="column is-one-fifth" style={{margin: '0 -1rem'}}>
            {footerContent.logo.display &&
              <img src={summit && summit.logo ?
                summit.logo
                :
                data.summit && data.summit.logo ?
                  data.summit.logo
                  :
                  null
              } style={{maxHeight: '4rem'}}/>
            }
          </div>
        </div>
        <div className={`${styles.footerColummns} columns`}>
          <div className="column is-three-quarter">
            <div className="columns">
              {footerContent.columns.map((col, index) => {
                return (
                  <div className={`column is-3 ${index > 0 ? 'is-offset-1' : ''}`} key={index}>
                    <h3>
                      {col.title}
                    </h3>
                    {col.items.map((item, index) => (
                      <a href={item.link} key={index}>
                        <h4>{item.title}</h4>
                      </a>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="column is-one-quarter">
            <h3>{footerContent.social.title}</h3>
            <div className={styles.socialContainer}>
              {footerContent.social.networks.map((net, index) => (
                net.display &&
                <a href={net.link} key={index}>
                  <i className={`fa icon is-large ${net.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )}
  />

)

const mapStateToProps = ({ summitState }) => ({
  summit: summitState.summit
})

export default connect(mapStateToProps)(Footer)
