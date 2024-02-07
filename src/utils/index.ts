export const generateLicenseNumber = () => {
  return 'RDL' + Math.random().toString(36).substr(2, 9)
}

