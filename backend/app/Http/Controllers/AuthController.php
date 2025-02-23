<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;

        $user = User::where('email', $email)->first();
        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email hoặc mật khẩu không chính xác'
            ], 401);
        }
        //Trả về user nếu đăng nhập thành công
        return response()->json([
            'status' => 'success',
            'message' => 'Đăng nhập thành công',
            'user' => $user
        ]);
    }
    public function register(Request $request)
   {
    $email = $request->email;
    $password = $request->password;
    $username = $request->username;
    $request->validate([
        'username' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6',
    ], [
        'username.max' => 'Họ tên không được vượt quá 255 ký tự',
        'email.unique' => 'Email này đã được sử dụng',
        'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
        'email.max' => 'Email không được vượt quá 255 ký tự'
    ]);

    try {
        $user = User::create([
            'username' => $username,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Đăng ký thành công',
            'user' => $user
        ]);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Dữ liệu không hợp lệ',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Có lỗi xảy ra khi đăng ký',
            'error' => $e->getMessage() 
        ], 500);
    }
}
    public function deleteUser($id)
    {
    try {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy người dùng'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Xóa người dùng thành công'
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Có lỗi xảy ra khi xóa người dùng',
            'error' => $e->getMessage()
        ], 500);
    }
}
    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::find($id);
            
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Không tìm thấy người dùng'
                ], 404);
            }

            $request->validate([
                'username' => 'required|string|max:255',
            ], [
                'username.required' => 'Vui lòng nhập tên người dùng',
                'username.max' => 'Tên người dùng không được vượt quá 255 ký tự'
            ]);

            $user->username = $request->username;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thông tin thành công',
                'user' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Có lỗi xảy ra khi cập nhật thông tin',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function getUser(){
        $users = DB::table('users')->get();
        return response()->json($users);
    }

}