import Link from "next/link";
import { FunctionComponent } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  MailIcon,
} from "@heroicons/react/solid";

import { UserImage } from "components";

const teachers = [
  // Todo: Use this API route to get actual data
  // Route - `/api/classes/${props._id.toString()}/teachers?filter=name schoolMail`
  // Type - import type { GetClassTeachersData } from "types/api/classes";
  {
    image: {
      portrait: "/Users/002.jpg",
    },
    schoolMail: "seth.ade@mola.io",
    name: {
      full: "Seth Adedeji",
      initials: "SA",
    },
  },
  {
    image: {
      portrait: "/Users/006.jpg",
    },
    schoolMail: "noah.ade@mola.io",
    name: {
      full: "Noah Adedeji",
      initials: "NA",
    },
  },
];

export const Teachers: FunctionComponent = () => {
  return (
    <div className="flex flex-col items-end justify-center gap-y-4 py-5">
      <button className="rounded bg-blue-500 px-4 py-2 text-sm tracking-wide text-white shadow hover:bg-blue-600">
        Invite Teacher
      </button>
      <div className="w-full divide-y divide-slate-300">
        {teachers?.map(({ name, image, schoolMail }, idx) => (
          <div
            key={idx}
            className="grid w-full gap-x-28 py-5"
            style={{ gridTemplateColumns: "1fr repeat(2, max-content)" }}
          >
            <div className="flex w-full items-center justify-start gap-4">
              <div
                style={{ shapeOutside: "circle(50% at 50% 50%)" }}
                className="aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-full"
              >
                <UserImage
                  src={image.portrait ?? ""}
                  alt={`${name.full}'s Image`}
                  fallbackText={name.initials}
                />
              </div>
              <div className="space-y-1 text-sm">
                <Link href={`/teachers/${idx}`}>
                  <a className="tracking-wide text-blue-600">{name.full}</a>
                </Link>
                <div className="flex gap-x-2">
                  <MailIcon className="h-5 w-5 fill-slate-500" />
                  <a
                    href={`mailto:${schoolMail}`}
                    className="flex gap-x-2 text-sm lowercase tracking-wide text-gray-500"
                  >
                    {schoolMail}
                  </a>
                </div>
              </div>
            </div>
            <Link href={`/teachers/${idx}`}>
              <a className="flex items-center text-sm tracking-wide text-blue-600">
                Go to Profile
                <ExternalLinkIcon className="h-4 w-4 fill-blue-600" />
              </a>
            </Link>
            <button
              type="button"
              className="text-sm tracking-wide text-red-600"
              onClick={() => alert(`Are you sure you want to remove ${name.full} from this class`)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between text-xs">
          <div className="flex cursor-pointer items-center gap-x-3 py-4 text-slate-600">
            <ChevronLeftIcon className="h-5 w-5 fill-slate-500" />
            Previous
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <span className="relative cursor-pointer py-4 px-2 text-blue-600 after:absolute after:-top-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600">
              1
            </span>
            {new Array(5).fill(null).map((_, i) => (
              <span key={i} className="cursor-pointer py-4 px-2 font-light text-slate-600">
                {i + 2}
              </span>
            ))}
          </div>
          <div className="flex cursor-pointer items-center gap-x-3 py-4 text-slate-600">
            Next
            <ChevronRightIcon className="h-5 w-5 fill-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
