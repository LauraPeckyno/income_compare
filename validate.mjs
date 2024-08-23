export {validateZipCodes};

// added my original validation back into this function

const validateZipCodes = (zipCode1, zipCode2) => {
    if (!zipCode1 || !zipCode2 || zipCode1.length !== 5 || zipCode2.length !== 5 || !/^\d+$/.test(zipCode)) {   // making sure the zips are right. Is it falsy, does it have more than 5 characters. does it have characters other than numbers
      return false;
    }
    return true;
  };