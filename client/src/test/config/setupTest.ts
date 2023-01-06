import "@testing-library/jest-dom";
import { vi } from "vitest";
import { EventSourceMock } from "../mocks/eventSourceMock";

/**
 * Mock the EventSource window variable.
 */
vi.stubGlobal("EventSource", EventSourceMock);
