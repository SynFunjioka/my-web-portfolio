import { Link } from "@remix-run/react";
import Icon from "../shared/Icon";
import { email, linkedin } from "~/data/home";

export default function Footer() {
  return (
    <footer className="py-8 bg-[#205781] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold mb-4 md:mb-0">
            <span className="text-[#98D2C0]">Alan </span>Flores
          </div>
          <div className="flex space-x-6">
            {/* <Link
              to={`https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-secondary-500">
                <Icon iconName="github" />
              </span>
            </Link> */}
            <Link
              to={`https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-secondary-500">
                <Icon iconName="linkedin" />
              </span>
            </Link>
            <Link to={`mailto:${email}`}>
              <span className="text-secondary-500">
                <Icon iconName="mail" />
              </span>
            </Link>
          </div>
        </div>
        <div className="text-center mt-6 text-sm text-white/70">
          &copy; {new Date().getFullYear()} Alan Amador Flores Fiscal. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  );
}