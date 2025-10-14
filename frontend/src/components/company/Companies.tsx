import type {CompanyModel} from "../models/CompanyModel.ts";

type CompaniesProps = {
    language: string;
    companies: CompanyModel[];

}

export default function Companies(props: Readonly<CompaniesProps>) {
    return(
        <div>
            <h2>Companies</h2>
            <p>This is the Companies page.</p>
        </div>
    )
}