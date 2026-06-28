// ======================================
// EVENT MANAGER
// ======================================

// ---------- Datums ----------
// Pas deze later gewoon aan.

const EVENTS = {

  christmas: {
    enabled: true,
    start: "2026-12-15",
    end: "2027-01-05"
  },

  halloween: {
    enabled: true,
    start: "2026-10-20",
    end: "2026-11-05"
  },

  easter: {
    enabled: true,
    start: "2027-03-25",
    end: "2027-04-10"
  },

  birthday: {
    enabled: true,
    start: "2026-08-15",
    end: "2026-08-22"
  }

};

// ===============================
// Alleen voor jou (Admin)
// ===============================

const ADMIN_EVENT = localStorage.getItem("adminEvent");

// mogelijke waarden:
//
// christmas
// halloween
// easter
// birthday
// none
//
// Verander NIETS hier.
// Het Admin Panel zal dit later aanpassen.

// ===============================

function today(){

    const d = new Date();

    return d.toISOString().split("T")[0];

}

function between(date,start,end){

    return date>=start && date<=end;

}

function automaticEvent(){

    const t=today();

    for(const key in EVENTS){

        const e=EVENTS[key];

        if(
            e.enabled &&
            between(t,e.start,e.end)
        ){

            return key;

        }

    }

    return null;

}

export function getCurrentEvent(){

    // Alleen jij ziet de override

    if(ADMIN_EVENT){

        if(ADMIN_EVENT==="none"){

            return null;

        }

        return ADMIN_EVENT;

    }

    return automaticEvent();

}

export function isChristmas(){

    return getCurrentEvent()==="christmas";

}

export function isHalloween(){

    return getCurrentEvent()==="halloween";

}

export function isEaster(){

    return getCurrentEvent()==="easter";

}

export function isBirthday(){

    return getCurrentEvent()==="birthday";

}
