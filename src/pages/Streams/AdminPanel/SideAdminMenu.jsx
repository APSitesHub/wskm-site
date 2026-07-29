import { LinkTo } from '../AdminPanel/CourseAdminPanel.styled';
import { AdminButtonBox } from './TeacherAdminPanel.styled';

const menuItems = [
  {
    slug: 'users',
    label: 'Students',
  },
  {
    slug: 'timetable',
    label: 'Timetable',
  },
];

const SideAdminMenu = ({ isOpen, currentPage }) => {
  return (
    <AdminButtonBox className={!isOpen ? 'hidden' : ''}>
      {menuItems.map(item => (
        <LinkTo
          key={item.slug}
          $isDisabled={currentPage === item.slug}
          to={`/${item.slug}`}
        >
          {item.label}
        </LinkTo>
      ))}
    </AdminButtonBox>
  );
};

export default SideAdminMenu;
