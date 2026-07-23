import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { buildSchoolUrl } from '../platformLinks';
import { MyPlatformBox } from './MyPlatform.styled';

export const MyPlatform = ({ platformLink }) => {
  const [src, setSrc] = useState(buildSchoolUrl('/school/'));
  const location = useLocation().search.slice(1);

  useEffect(() => {
    const setIframeSRC = () => {
      !platformLink && !location
        ? setSrc(buildSchoolUrl('/school/'))
        : !location
        ? setSrc(platformLink)
        : setSrc(location);
    };

    setIframeSRC();
  }, [platformLink, location]);

  return (
    <>
      <MyPlatformBox>
        <iframe
          id="platform-window"
          title="platform-pin"
          src={src}
          width="100%"
          height="100%"
          allow='microphone *'
        ></iframe>
      </MyPlatformBox>
    </>
  );
};
