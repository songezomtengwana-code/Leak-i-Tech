let _email;

function main() {

}

function registerActiveUser(email) {
    if (email === 'jake@nypd.com') {
        return _email = 'jakeperalta'
    } else if (email === 'charles@nypd.com') {
        return _email = 'charlesboyle'
    } else if (email === 'raymond@nypd.com') {
        return _email = 'holtraymond'
    } else {
        return _email = null
    }

    console.log({ email: _email })
}