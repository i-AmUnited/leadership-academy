import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManageStaff from "./manageStaff.jsx";

const refetchMock = vi.fn();
const dispatchMock = vi.fn(async () => ({ payload: { status_code: "0", message: "ok" } }));

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
  useSelector: (selector) => selector({ user: { loading: false } }),
}));

vi.mock("../hooks/constants", () => ({
  showSuccessToast: vi.fn(),
  showErrorToast: vi.fn(),
}));

const CreateStaffMock = vi.fn((data) => ({ type: "CreateStaff", data }));
const UpdateStaffMock = vi.fn((data) => ({ type: "UpdateStaff", data }));
const ToggleStaffMock = vi.fn((data) => ({ type: "ToggleStaff", data }));

vi.mock("../hooks/local/reducer", () => ({
  CreateStaff: (data) => CreateStaffMock(data),
  UpdateStaff: (data) => UpdateStaffMock(data),
  ToggleStaff: (data) => ToggleStaffMock(data),
}));

const staffFixture = [
  {
    id: "1",
    name: "John Doe",
    post: "Teacher",
    list_id: "1234",
    status: "0",
    inserted_dt: "2025-01-01 00:00:00",
  },
];

vi.mock("../lib/reuseableEffects", () => ({
  useStaffList: () => ({ staff: staffFixture, refetch: refetchMock }),
}));

describe("ManageStaff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates staff with required fields and generated list_id", async () => {
    const user = userEvent.setup();
    render(<ManageStaff />);

    await user.click(screen.getByText("Create staff"));
    expect(await screen.findByText("Create Staff")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Staff name"), "Jane Smith");
    await user.type(screen.getByLabelText("Role"), "Principal");

    const file = new File(["avatar"], "avatar.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Upload Image");
    await user.upload(fileInput, file);

    await user.click(screen.getByText("Create staff"));

    expect(CreateStaffMock).toHaveBeenCalledTimes(1);
    const formData = CreateStaffMock.mock.calls[0][0];
    expect(formData.get("name")).toBe("Jane Smith");
    expect(formData.get("post")).toBe("Principal");
    expect(formData.get("upload_image")).toBeInstanceOf(File);

    const listId = formData.get("list_id");
    expect(listId).toMatch(/^\d{4}$/);
    expect(Number(listId)).toBeGreaterThanOrEqual(1000);
    expect(Number(listId)).toBeLessThanOrEqual(9999);
  });

  it("opens edit dialog with prepopulated values and dispatches UpdateStaff", async () => {
    const user = userEvent.setup();
    render(<ManageStaff />);

    await user.click(screen.getAllByLabelText("Edit staff John Doe")[0]);

    expect(await screen.findByText("Edit Staff")).toBeInTheDocument();
    expect(screen.getByLabelText("Staff name")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Role")).toHaveValue("Teacher");
    expect(screen.getByLabelText("List ID")).toHaveValue("1234");

    await user.clear(screen.getByLabelText("Role"));
    await user.type(screen.getByLabelText("Role"), "Senior Teacher");

    await user.click(screen.getByText("Update staff"));

    expect(UpdateStaffMock).toHaveBeenCalledTimes(1);
    const formData = UpdateStaffMock.mock.calls[0][0];
    expect(formData.get("id")).toBe("1");
    expect(formData.get("name")).toBe("John Doe");
    expect(formData.get("post")).toBe("Senior Teacher");
    expect(formData.get("list_id")).toBe("1234");
  });
});
