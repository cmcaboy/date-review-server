import * as DataLoader from "dataloader";
import { Person } from "../entities/Person";

type BatchPerson = (ids: string[]) => Promise<Person[]>;
const batchPersons: BatchPerson = async ids => {
  const persons = await Person.findByIds(ids);

  const personMap: { [key: string]: Person } = {};
  persons.forEach(u => {
    personMap[u.id] = u;
  });

  return ids.map(id => personMap[id]);
};

export const personLoader = () => new DataLoader<string, Person>(batchPersons);
