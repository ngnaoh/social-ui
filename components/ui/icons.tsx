type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  facebook: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64px"
      height="64px"
      {...props}
    >
      <linearGradient
        id="JOZq0V4XPxMzNaLCE5XPGa"
        x1="37.646"
        x2="37.646"
        y1="14.5"
        y2="56.878"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#6dc7ff" />
        <stop offset="1" stop-color="#e6abff" />
      </linearGradient>
      <path
        fill="url(#JOZq0V4XPxMzNaLCE5XPGa)"
        d="M42,56V38h5.358l0.934-8H42v-4.457c0-2.097-0.131-3.527,2.877-3.527L48,22.014v-6.479 c-1-0.088-2.487-0.285-5.136-0.285c-5.531,0-8.864,3.376-8.864,9.576V30h-7v8h7v18H42z"
      />
      <linearGradient
        id="JOZq0V4XPxMzNaLCE5XPGb"
        x1="32"
        x2="32"
        y1="6.833"
        y2="58.017"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#1a6dff" />
        <stop offset="1" stop-color="#c822ff" />
      </linearGradient>
      <path
        fill="url(#JOZq0V4XPxMzNaLCE5XPGb)"
        d="M50,57H14c-3.859,0-7-3.141-7-7V14c0-3.859,3.141-7,7-7h36c3.859,0,7,3.141,7,7v36 C57,53.859,53.859,57,50,57z M14,9c-2.757,0-5,2.243-5,5v36c0,2.757,2.243,5,5,5h36c2.757,0,5-2.243,5-5V14c0-2.757-2.243-5-5-5H14z"
      />
    </svg>
  ),
  instagram: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64px"
      height="64px"
      {...props}
    >
      <linearGradient
        id="jm_nAfYbxsVmTlYr5N4x9a"
        x1="32"
        x2="32"
        y1="6.667"
        y2="57.872"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#1A6DFF" />
        <stop offset="1" stop-color="#C822FF" />
      </linearGradient>
      <path
        fill="url(#jm_nAfYbxsVmTlYr5N4x9a)"
        d="M44,57H20c-7.168,0-13-5.832-13-13V20c0-7.168,5.832-13,13-13h24c7.168,0,13,5.832,13,13v24 C57,51.168,51.168,57,44,57z M20,9C13.935,9,9,13.935,9,20v24c0,6.065,4.935,11,11,11h24c6.065,0,11-4.935,11-11V20 c0-6.065-4.935-11-11-11H20z"
      />
      <linearGradient
        id="jm_nAfYbxsVmTlYr5N4x9b"
        x1="32"
        x2="32"
        y1="18.167"
        y2="45.679"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#8ab4ff" />
        <stop offset="1" stop-color="#e492ff" />
      </linearGradient>
      <path
        fill="url(#jm_nAfYbxsVmTlYr5N4x9b)"
        d="M32,45c-7.168,0-13-5.832-13-13c0-7.168,5.832-13,13-13c7.168,0,13,5.832,13,13 C45,39.168,39.168,45,32,45z M32,23c-4.962,0-9,4.038-9,9c0,4.963,4.038,9,9,9c4.963,0,9-4.037,9-9C41,27.038,36.963,23,32,23z"
      />
      <linearGradient
        id="jm_nAfYbxsVmTlYr5N4x9c"
        x1="46"
        x2="46"
        y1="12.75"
        y2="23.049"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#8ab4ff" />
        <stop offset="1" stop-color="#e492ff" />
      </linearGradient>
      <path
        fill="url(#jm_nAfYbxsVmTlYr5N4x9c)"
        d="M46 15A3 3 0 1 0 46 21A3 3 0 1 0 46 15Z"
      />
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      {...props}
    >
      <linearGradient
        id="HOaxCdew_So_FZGl4pPQ6a_bG29Ckcdp6YP_gr1"
        x1="32"
        x2="32"
        y1="9"
        y2="55"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#1a6dff"></stop>
        <stop offset="1" stop-color="#c822ff"></stop>
      </linearGradient>
      <path
        fill="url(#HOaxCdew_So_FZGl4pPQ6a_bG29Ckcdp6YP_gr1)"
        d="M49,55H15c-3.309,0-6-2.691-6-6V15c0-3.309,2.691-6,6-6h34c3.309,0,6,2.691,6,6v34	C55,52.309,52.309,55,49,55z M15,11c-2.206,0-4,1.794-4,4v34c0,2.206,1.794,4,4,4h34c2.206,0,4-1.794,4-4V15c0-2.206-1.794-4-4-4H15	z"
      ></path>
      <linearGradient
        id="HOaxCdew_So_FZGl4pPQ6b_bG29Ckcdp6YP_gr2"
        x1="32"
        x2="32"
        y1="13"
        y2="51"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#6dc7ff"></stop>
        <stop offset="1" stop-color="#e6abff"></stop>
      </linearGradient>
      <path
        fill="url(#HOaxCdew_So_FZGl4pPQ6b_bG29Ckcdp6YP_gr2)"
        d="M26.978,22l14.108,20h-3.063L23.914,22H26.978z M51,15v34c0,1.1-0.9,2-2,2H15	c-1.1,0-2-0.9-2-2V15c0-1.1,0.9-2,2-2h34C50.1,13,51,13.9,51,15z M44.914,44L34.789,29.613L43,20h-2.5l-6.841,8.009L28.022,20	h-7.937l9.222,13.103L20,44h2.5l7.937-9.292L36.978,44H44.914z"
      ></path>
    </svg>
  ),
};
