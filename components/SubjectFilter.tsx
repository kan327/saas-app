'use client'

import { subjects } from "@/constants"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') ?? '';
  const [subject, setSubject] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if (subject === "all") {
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['subject'],
        })
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'subject',
          value: subject,
        })
      }
      router.push(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [subject, router, searchParams])


  return (
    <Select
      onValueChange={setSubject}
      value={subject}
    >
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all' className="capitalize">All Subject</SelectItem>
        {subjects.map((subject) => (
          <SelectItem value={subject} key={subject} className="capitalize">{subject}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SubjectFilter