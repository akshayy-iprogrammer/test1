export const CustomValidation = {
    alphaOnlyWithSpace: '^(?![\s]*$)[a-zA-Z ]+$',
    alphaNumericandUnderscoreHypen: '^[a-zA-Z0-9_-]*$',
    alphaOnlyWithSpaceanddot: '^(?![\s\.]*$)[a-zA-Z \.]+$',
    numberOnly: '^[0-9]*$',
    email: '^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$',
    address: '^(?!\s*$)[a-zA-Z0-9_@.\/#&*-\:\s,\[\]\"\'-]+$',
    website: '^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$'
}