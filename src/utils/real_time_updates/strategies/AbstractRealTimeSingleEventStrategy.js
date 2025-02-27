/**
 * AbstractRealTimeSingleEventStrategy
 */
class AbstractRealTimeSingleEventStrategy {

    constructor(callback, checkPastCallback) {
        this._fallback = null;
        this._callback = callback;
        this._checkPastCallback = checkPastCallback;
        this._usingFallback = false;
    }

    /**
     *
     * @param fallback
     */
    setFallback(fallback){
        this._fallback = fallback;
    }

    /**
     *
     * @param summit
     * @param event
     * @param eventId
     * @param lastUpdate
     */
    startUsingFallback(summit, event, eventId, lastUpdate){
        if(this._fallback) {
            this._usingFallback = true;
            this._fallback.create(summit, event, eventId, lastUpdate);
        }
    }

    stopUsingFallback(){
        if(this._fallback) {
            this._usingFallback = false;
            this._fallback.close();
        }
    }

    /**
     *
     * @param summit
     * @param event
     * @param eventId
     * @param lastUpdate
     */
    create(summit, event, eventId, lastUpdate){}

    close(){}

    /**
     *
     * @returns {*|boolean|boolean}
     */
    manageBackgroundErrors(){
        if(this._usingFallback){
            return this._fallback.manageBackgroundErrors();
        }
        return false;
    }

    /**
     *
     * @returns {*|boolean|boolean}
     */
    hasBackgroundError(){
        if(this._usingFallback){
            return this._fallback.hasBackgroundError();
        }
        return false;
    }
}

export default AbstractRealTimeSingleEventStrategy;