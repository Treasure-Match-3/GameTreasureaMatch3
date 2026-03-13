// src/types/game.ts

/**
 * 1. Định nghĩa các loại đá quý (Màu sắc/Hình dạng)
 * Dùng Enum để Sơn và bạn dễ dàng viết câu lệnh switch/case hoặc if/else
 */
export enum GemType {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  PURPLE = 'PURPLE',
  EMPTY = 'EMPTY', // Dùng khi viên đá đã vỡ nhưng hạt mới chưa kịp rơi xuống
}

/**
 * 2. Định nghĩa các chướng ngại vật hoặc trạng thái đặc biệt
 */
export enum CellModifier {
  NONE = 'NONE',         // Ô bình thường
  FROZEN = 'FROZEN',     // Ô bị đóng băng (phá băng bằng cách match các ô xung quanh)
  CHAINED = 'CHAINED',   // Ô bị xích (không thể hoán đổi, phải tạo match chứa chính ô này)
}

/**
 * 3. Tọa độ của một ô trên lưới
 */
export interface Position {
  row: number;
  col: number;
}

/**
 * 4. Cấu trúc cốt lõi của MỘT Ô (Cell) trên bàn chơi
 * Đây là linh hồn của game, mọi thuật toán sẽ thao tác trên Object này
 */
export interface Cell {
  id: string;            // Rất quan trọng cho Next.js/React! Dùng làm 'key' để render animation mượt mà, không bị giật UI khi hoán đổi.
  type: GemType;         // Loại đá quý
  modifier: CellModifier;// Trạng thái (Bình thường, Đóng băng, Xích)
  position: Position;    // Tọa độ hiện tại
  isMatched?: boolean;   // Cờ đánh dấu ô này vừa tạo thành chuỗi và chuẩn bị vỡ (tùy chọn, dùng để trigger animation)
}

/**
 * 5. Cấu trúc Bàn chơi (Board)
 * Bàn chơi đơn giản là một mảng 2 chiều (mảng lồng mảng) chứa các Cell.
 */
export type Board = Cell[][];

/**
 * 6. (Bonus cho AI của Duy) Cấu trúc một Nước đi (Move)
 * Dùng để hàm Hint hoặc Bot AI trả về kết quả
 */
export interface Move {
  from: Position;
  to: Position;
  scoreExpected: number; // Điểm số dự kiến mang lại từ nước đi này (áp dụng Heuristic)
}