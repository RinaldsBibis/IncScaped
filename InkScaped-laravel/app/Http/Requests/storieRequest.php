<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class storieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'prompt_id' => 'exists:daly_prompts,id',
            'user_id' => ['exists:users,id'],
            'title' => 'required|string',
            'content' => 'required|string|min:101',
        ];
    }
}
