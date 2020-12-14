import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { CountryInput, LanguageInput, DateTimePicker } from 'openstack-uicore-foundation/lib/components'
import { epochToMomentTimeZone } from 'openstack-uicore-foundation/lib/methods'
import moment from "moment-timezone";

import Layout from '../components/Layout'
import withOrchestra from "../utils/widgetOrchestra";

import ScheduleLiteComponent from '../components/ScheduleLiteComponent'
import ProfilePopupComponent from '../components/ProfilePopupComponent'

import { updateProfilePicture, updateProfile, getIDPProfile } from '../actions/user-actions'

import styles from '../styles/full-profile.module.scss'

export const FullProfilePageTemplate = ({ loggedUser, user, getIDPProfile, updateProfile, updateProfilePicture, addWidgetRef, updateWidgets }) => {

    const [showProfile, setShowProfile] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [irc, setIrc] = useState('')
    const [github, setGithub] = useState('')
    const [twitter, setTwitter] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [language, setLanguage] = useState('')
    const [showFullName, setShowFullName] = useState(undefined)
    const [showPicture, setShowPicture] = useState(undefined)
    const [showEmail, setShowEmail] = useState(undefined)
    const [bio, setBio] = useState('')
    const [street, setStreet] = useState('')
    const [floor, setFloor] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')
    const [phone, setPhone] = useState('')

    const [image, setImage] = useState(null);

    useEffect(() => {
        getIDPProfile();
        setImage(user.idpProfile.picture)
        setFirstName(user.idpProfile.given_name);
        setLastName(user.idpProfile.family_name);
        setCompany(user.idpProfile.company || '');
        setEmail(user.idpProfile.email || '');
        setBirthday(user.idpProfile.birthdate?.date ? moment(user.idpProfile.birthdate.date).valueOf() : null);
        setGender(user.idpProfile.gender || '');
        setIrc(user.idpProfile.irc || '');
        setGithub(user.idpProfile.github_user || '');
        setTwitter(user.idpProfile.twitter_user || '');
        setLinkedin(user.idpProfile.linked_in_profile || '');
        setIdentifier(user.idpProfile.nickname || '');
        // { "_method": "PUT", "_token": "BvKJHyTBgrWG8qnRihkZL1yjfERyBQsiDLJqMwgz", "first_name": "Tomás", "last_name": "Castillo", "email": "tomas@tipit.net", "identifier": "tomas.castillo", "second_email": '', "third_email": '', "gender": "Prefer not to say", "gender_specify": '', "bio": '', "statement_of_interest": '', "irc": '', "github_user": '', "twitter_name": '', "wechat_user": '', "linked_in_profile": '', "address1": "San Martin 24", "address2": '', "city": "Mendoza", "state": "Mendoza", "post_code": "5500", "country_iso_code": "AR", "company": "Tipit LLC", "job_title": "Frontend Developer", "phone_number": '', "language": "en", "password": '', "password_confirmation": '', "id": "2", "undefined": true, "public_profile_show_fullname": false, "public_profile_show_photo": false, "public_profile_show_email": false, "birthday": 630727200 }

        setLanguage(user.idpProfile.locale || '');
        setShowFullName(undefined);
        setShowPicture(undefined);
        setShowEmail(undefined);
        setBio(user.idpProfile.bio || '');
        setStreet(user.idpProfile.address || '');
        setFloor(user.idpProfile.email || '');
        setCity(user.idpProfile.locality || '');
        setState(user.idpProfile.region || '');
        setZipCode(user.idpProfile.postal_code || '');
        setCountry(user.idpProfile.country || '');
        setPhone(user.idpProfile.phone_number || '');
        return () => {
            setFirstName('');
            setLastName('');
            setCompany('');
        };
    }, []);

    const handlePictureUpdate = (picture) => {
        updateProfilePicture(picture);
    }

    const handleProfileUpdate = (profile) => {
        if (profile) {
            updateProfile(profile)
        } else {
            const newProfile = {
                first_name: firstName,
                last_name: lastName,
                company: company,
                email: email,
                birthday: birthday,
                gender: gender,
                irc: irc,
                github_user: github,
                twitter_user: twitter,
                linked_in_profile: linkedin,
                identifier: identifier,
                language: language,
                public_profile_show_fullname: showFullName,
                public_profile_show_photo: showPicture,
                public_profile_show_email: showEmail,
                bio: bio,
                street: street,
                floor: floor,
                city: city,
                state: state,
                post_code: zipCode,
                country_iso_code: country,
                phone_number: phone,
            }
            updateProfile(newProfile);
        }
    }

    const handleTogglePopup = (profile) => {
        if (profile) {
            document.body.classList.add('is-clipped');
        } else {
            document.body.classList.remove('is-clipped');
        }
        setShowProfile(profile)
    }

    const onEventChange = (ev) => {
        navigate(`/a/event/${ev.id}`);
    }

    const onViewAllEventsClick = () => {
        navigate('/a/schedule')
    }


    const profileUpdate = () => {
        // changeProfile(newProfile);
    }

    // onClickSave = () => {
    //     if (editorRef.current && newImage) {
    //         const canvas = editorRef.current.getImage().toDataURL();
    //         urltoFile(canvas, image.name)
    //             .then(file => changePicture(file));
    //     }
    //     if (userProfile.given_name !== firstName ||
    //         userProfile.family_name !== lastName ||
    //         userProfile.company !== company) {
    //         const newProfile = {
    //             first_name: firstName,
    //             last_name: lastName,
    //             company: company
    //         }
    //         changeProfile(newProfile);
    //     }
    // }

    console.log('render=?Asdasd', language, country)

    if (user.loadingIDP) {
        return null
    } else {
        return (
            <React.Fragment>
                <div className="px-6 py-6 mb-6">
                    <div className={`columns is-3 ${styles.fullProfile}`} >
                        <div className="column is-3">
                            <div className={styles.profilePicture} onClick={() => handleTogglePopup(!showProfile)}>
                                <img src={image} />                                
                            </div>
                            <h3>
                                Hello, <br />
                                {firstName} {lastName}
                            </h3>
                            <h4>
                                @{identifier}
                            </h4>
                        </div>
                        <div className="column">
                            <div className={styles.formContainer}>
                                <div className={styles.header}>Personal Profile</div>
                                <div className={styles.form}>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>First Name</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="First Name"
                                                onChange={e => setFirstName(e.target.value)}
                                                value={firstName}
                                            />
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Last Name</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Last Name"
                                                onChange={e => setLastName(e.target.value)}
                                                value={lastName}
                                            />
                                        </div>
                                    </div>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Company</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Company"
                                                onChange={e => setCompany(e.target.value)}
                                                value={company}
                                            />
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Email</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Email"
                                                onChange={e => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>
                                    </div>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Birthday</b>
                                            <div className="columns field">
                                                <div className={`column ${styles.control}`}>
                                                    <DateTimePicker
                                                        onChange={e => setBirthday((e.target.value.valueOf() / 100))}
                                                        format={{ date: 'MM/DD/YYYY', time: '' }}
                                                        value={epochToMomentTimeZone(birthday)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Gender</b>
                                            <div className={styles.control}>
                                                <div className={`${styles.select} ${styles.isLarge}`}>
                                                    <select
                                                        onChange={e => setGender(e.target.value)}
                                                        value={gender}
                                                    >
                                                        <option>Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Prefer not to say">Prefer not to say</option>
                                                        <option value="Let me specify">Let me specify</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>IRC</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="IRC"
                                                onChange={e => setIrc(e.target.value)}
                                                value={irc}
                                            />
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Github</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Github"
                                                onChange={e => setGithub(e.target.value)}
                                                value={github}
                                            />
                                        </div>
                                    </div>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Twitter</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Twitter"
                                                onChange={e => setTwitter(e.target.value)}
                                                value={twitter}
                                            />
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Linkedin</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Linkedin"
                                                onChange={e => setLinkedin(e.target.value)}
                                                value={linkedin}
                                            />
                                        </div>
                                    </div>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Identifier</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Identifier"
                                                onChange={e => setIdentifier(e.target.value)}
                                                value={identifier}
                                            />
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Language</b>
                                            <LanguageInput
                                                onChange={e => setLanguage(e.target.value)}
                                                value={language}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <label className={styles.checkbox}>
                                    <input type="checkbox" value={showFullName} onChange={e => setShowFullName(e.target.value)} />
                                Show full name on public profile
                            </label>
                                <br />
                                <label className={styles.checkbox}>
                                    <input type="checkbox" value={showPicture} onChange={e => setShowPicture(e.target.value)} />
                                Show picture on public profile
                            </label>
                                <br />
                                <label className={styles.checkbox}>
                                    <input type="checkbox" value={showEmail} onChange={e => setShowEmail(e.target.value)} />
                                Show email on public profile
                            </label>
                                <div className={styles.buttons}>
                                    <button className="button is-large">Discard</button>
                                    <button className="button is-large">Update</button>
                                </div>
                            </div>
                            <div className={styles.formContainer}>
                                <div className={styles.header}>Bio</div>
                                <div className={styles.form}>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-full ${styles.inputField}`}>
                                            <textarea
                                                className="textarea"
                                                placeholder=''
                                                rows="10"
                                                onChange={e => setBio(e.target.value)}
                                                value={bio}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button className="button is-large">Discard</button>
                                    <button className="button is-large">Update</button>
                                </div>
                            </div>
                            <div className={styles.formContainer}>
                                <div className={styles.header}>Address</div>
                                <div className={styles.form}>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Address</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Complete your address"
                                                onChange={e => setStreet(e.target.value)}
                                                value={street}
                                            />
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Address 2</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Complete your address"
                                                onChange={e => setFloor(e.target.value)}
                                                value={floor}
                                            />
                                        </div>
                                    </div>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>City</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Complete your city"
                                                onChange={e => setCity(e.target.value)}
                                                value={city}
                                            />
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>State</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Complete your state"
                                                onChange={e => setState(e.target.value)}
                                                value={state}
                                            />
                                        </div>
                                    </div>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Zip Code</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Complete your zip code"
                                                onChange={e => setZipCode(e.target.value)}
                                                value={zipCode}
                                            />
                                        </div>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Country</b>
                                            <CountryInput
                                                onChange={e => setCountry(e.target.value)}
                                                value={country}
                                            />
                                        </div>
                                    </div>
                                    <div className={`columns is-mobile ${styles.inputRow}`}>
                                        <div className={`column is-half ${styles.inputField}`}>
                                            <b>Phone</b>
                                            <input
                                                className={`${styles.input} ${styles.isLarge}`}
                                                type="text"
                                                placeholder="Complete your phone"
                                                onChange={e => setPhone(e.target.value)}
                                                value={phone}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button className="button is-large">Discard</button>
                                    <button className="button is-large">Update</button>
                                </div>
                            </div>
                        </div>
                        <div className="column is-3">
                            <div className={styles.header}>My Schedule</div>
                            <ScheduleLiteComponent
                                accessToken={loggedUser.accessToken}
                                onEventClick={(ev) => onEventChange(ev)}
                                onViewAllEventsClick={() => onViewAllEventsClick()}
                                title=''
                                landscape={true}
                                yourSchedule={true}
                                showNav={true}
                                eventCount={10}
                                slotCount={1}
                                onRef={addWidgetRef}
                                updateCallback={updateWidgets}
                            />
                        </div>
                    </div>
                </div>
                {showProfile &&
                    <ProfilePopupComponent
                        userProfile={user.idpProfile}
                        showProfile={showProfile}
                        idpLoading={user.loadingIDP}
                        changePicture={(pic) => handlePictureUpdate(pic)}
                        changeProfile={(profile) => handleProfileUpdate(profile)}
                        closePopup={() => handleTogglePopup(!showProfile)}
                    />
                }
            </React.Fragment >
        )
    }
};

const OrchestedTemplate = withOrchestra(FullProfilePageTemplate);

const FullProfilePage = (
    {
        location,
        loggedUser,
        user,
        getIDPProfile,
        updateProfile,
        updateProfilePicture,
    }
) => {
    return (
        <Layout location={location}>
            <OrchestedTemplate
                loggedUser={loggedUser}
                user={user}
                getIDPProfile={getIDPProfile}
                updateProfile={updateProfile}
                updateProfilePicture={updateProfilePicture} />
        </Layout>
    )
}

FullProfilePage.propTypes = {
    loggedUser: PropTypes.object,
    user: PropTypes.object,
    getIDPProfile: PropTypes.func,
    updateProfile: PropTypes.func,
    updateProfilePicture: PropTypes.func,
}

FullProfilePageTemplate.propTypes = {
    loggedUser: PropTypes.object,
    user: PropTypes.object,
    getIDPProfile: PropTypes.func,
    updateProfile: PropTypes.func,
    updateProfilePicture: PropTypes.func,
}

const mapStateToProps = ({ loggedUserState, userState }) => ({
    loggedUser: loggedUserState,
    user: userState,
})

export default connect(mapStateToProps,
    {
        getIDPProfile,
        updateProfile,
        updateProfilePicture
    }
)(FullProfilePage);