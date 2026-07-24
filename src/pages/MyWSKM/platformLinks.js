const SCHOOL_ORIGIN = 'https://online.ap.education';

export const STUDENT_LESSONS_PATH = '/cabinet/student/lessons';

export const buildSchoolUrl = path => {
  return new URL(path, SCHOOL_ORIGIN).toString();
};

export const buildPlatformLoginUrl = (
  token,
  redirectPath = STUDENT_LESSONS_PATH
) => {
  const redirectUrl = buildSchoolUrl(redirectPath);

  if (!token) {
    return redirectUrl;
  }

  const loginUrl = new URL('/LoginByToken', SCHOOL_ORIGIN);
  loginUrl.searchParams.set('token', token);
  loginUrl.searchParams.set('redirectUrl', redirectUrl);

  return loginUrl.toString();
};
